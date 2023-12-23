package com.project.examportalbackend.services;

public interface TokenBlackList {
    void addToBlacklist(String token);
    boolean isBlacklisted(String token);
    void clearExpiredTokens();
}
