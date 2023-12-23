package com.project.examportalbackend.schedule;

import com.project.examportalbackend.services.TokenBlackList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class CleanTokenBlackListTask {

    @Autowired
    private TokenBlackList tokenBlackList;

    @Scheduled(fixedDelay = 1200000)
    public void clearExpiredBlackListedTokens(){
        tokenBlackList.clearExpiredTokens();
    }
}
