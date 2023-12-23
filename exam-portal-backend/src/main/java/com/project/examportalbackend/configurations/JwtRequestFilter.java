package com.project.examportalbackend.configurations;

import com.project.examportalbackend.models.User;
import com.project.examportalbackend.repository.UserRepository;
import com.project.examportalbackend.services.TokenBlackList;
import com.project.examportalbackend.services.implementation.UserDetailsServiceImpl;
import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.file.AccessDeniedException;
import java.util.Objects;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {
    @Autowired
    private UserDetailsServiceImpl userDetailsServiceImpl;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TokenBlackList tokenBlackList;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        final String requestTokenHeader = request.getHeader("Authorization");

        String username = null;
        String jwtToken = null;

        if (requestTokenHeader == null) {
            filterChain.doFilter(request, response);
            return;
        }



        if (requestTokenHeader.startsWith("Bearer ")) {
            jwtToken = requestTokenHeader.substring(7);

            if(tokenBlackList.isBlacklisted(jwtToken)){
                System.out.println("The token is not valid");
                filterChain.doFilter(request, response);
                return;
            }

            try {
                username = jwtUtil.extractUsername(jwtToken);
            } catch (IllegalArgumentException e) {
                System.out.println("Unable to get JWT Token");
            } catch (ExpiredJwtException e) {
                System.out.println("JWT Token has expired");
            }
        } else {
            System.out.println("JWT token does not start with Bearer");
            filterChain.doFilter(request, response);
            return;
        }

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            User user = userRepository.findByEmail(username);
            if(user.getResetPassword() == 1 && !Objects.equals(request.getServletPath(), "/api/reset-password")) {
                filterChain.doFilter(request, response);
                return;
            }
            UserDetails userDetails = userDetailsServiceImpl.loadUserByUsername(username);
            if (Boolean.TRUE.equals(jwtUtil.validateToken(jwtToken, userDetails))) {
                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
            } else {
                System.out.println("Token is not valid");
            }
        }
        filterChain.doFilter(request, response);
    }
}
