package com.project.examportalbackend.utils.constants;

public enum Roles {
    STUDENT("STUDENT"),
    PROFESSOR("PROFESSOR"),
    ADMIN("ADMIN");

    private final String roleName;

    Roles(final String roleName){
        this.roleName = roleName;
    }
    @Override
    public String toString() {
        return roleName;
    }
}
