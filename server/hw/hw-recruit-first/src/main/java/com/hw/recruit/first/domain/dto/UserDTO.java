package com.hw.recruit.first.domain.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class UserDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    private Integer id;

    private String username;

    private String qqId;

    private String phone;

    private String bio;

    private Integer status;

    private String will;

    private String school;

    private String major;

    private String grade;

    private String createAt;

    private String updateAt;

}
