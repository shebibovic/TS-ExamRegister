package com.project.examportalbackend.utils.constants;

public enum ErrorTypeMessages {
    RESOURCE_NOT_FOUND("Resource not found"),
    UNAUTHORIZED("Unauthorized access"),

    BAD_REQUEST("Bad request");


    private final String errorTypeMessage;

    ErrorTypeMessages(final String errorTypeMessage){
        this.errorTypeMessage = errorTypeMessage;
    }
    @Override
    public String toString() {
        return errorTypeMessage;
    }
}
