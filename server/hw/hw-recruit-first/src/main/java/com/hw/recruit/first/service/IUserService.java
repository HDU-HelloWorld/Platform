package com.hw.recruit.first.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.hw.recruit.first.domain.dto.UserDTO;
import com.hw.recruit.first.domain.po.User;

import java.util.List;


public interface IUserService extends IService<User> {
    void insert(UserDTO userDTO);

    User selectById(int id);

    List<User> getUsersWithinTimeFrame(List<String> timeFrame);
}
