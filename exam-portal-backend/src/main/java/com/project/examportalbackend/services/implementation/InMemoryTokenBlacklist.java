package com.project.examportalbackend.services.implementation;

import com.project.examportalbackend.configurations.JwtUtil;
import com.project.examportalbackend.services.TokenBlackList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class InMemoryTokenBlacklist implements TokenBlackList {

    @Autowired
    private JwtUtil jwtUtil;

    private Set<String> blacklist = new HashSet<>();

    @Override
    public void addToBlacklist(String token) {
        blacklist.add(token);
    }

    @Override
    public boolean isBlacklisted(String token) {
        return blacklist.contains(token);
    }

    @Override
    public void clearExpiredTokens(){
        blacklist.removeIf(item -> jwtUtil.isTokenExpired(item));
    }
}