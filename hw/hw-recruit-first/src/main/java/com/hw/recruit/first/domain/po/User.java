package com.hw.recruit.first.domain.po;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@TableName("recruit_first_table")
@Accessors(chain = true)
public class User implements Serializable {

    private static final long serialVersionUID = 1L;
    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;

    private String username;

    @TableField("qq_id")
    private String qqId;

    private String phone;

    private String bio;

    private Integer status;

    private String will;

    private String school;

    private String major;

    private String grade;
    @TableField("create_at")
    private LocalDateTime createAt;
    @TableField("update_at")
    private LocalDateTime updateAt;

}
