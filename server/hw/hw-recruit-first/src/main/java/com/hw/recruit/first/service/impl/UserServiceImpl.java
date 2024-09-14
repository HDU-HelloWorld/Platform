package com.hw.recruit.first.service.impl;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.date.DateUtil;
import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.hw.common.exception.BadRequestException;
import com.hw.recruit.first.domain.dto.UserDTO;
import com.hw.recruit.first.domain.po.User;
import com.hw.recruit.first.mapper.UserMapper;
import com.hw.recruit.first.service.IUserService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;

@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements IUserService {

    @Resource
    private UserMapper userMapper;

    @Override
    public void insert(UserDTO userDTO) {
        String phone = userDTO.getPhone();
        String qqId = userDTO.getQqId();
        String username = userDTO.getUsername();
        if (StrUtil.isEmpty(phone) || StrUtil.isEmpty(qqId) || StrUtil.isEmpty(username)) {
            throw new BadRequestException("手机号码、qq号和用户名不能为空！");
        }
        User user = new User();
        BeanUtil.copyProperties(userDTO, user, "createAt", "updateAt");
        userMapper.insert(user);

    }

    @Override
    public User selectById(int id) {
        User user = userMapper.selectById(id);
        if (BeanUtil.isEmpty(user)) {
            throw new BadRequestException("id不存在！");
        }
        return user;
    }

    @Override
    public List<User> getUsersWithinTimeFrame(List<String> timeFrame) {
        LocalDateTime startTime = null;
        LocalDateTime endTime = null;
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();

        if (!StrUtil.isEmpty(timeFrame.get(0))) {
            startTime = DateUtil.parse(timeFrame.get(0))
                    .toInstant()
                    .atZone(ZoneId.systemDefault())
                    .toLocalDateTime();
        }
        if (!StrUtil.isEmpty(timeFrame.get(1))) {
            endTime = DateUtil.parse(timeFrame.get(1))
                    .toInstant()
                    .atZone(ZoneId.systemDefault())
                    .toLocalDateTime();
        }

        if (startTime == null && endTime == null) {
            return new ArrayList<>();
        } else if (startTime == null) {
            queryWrapper.le("create_at", endTime);
        } else if (endTime == null) {
            queryWrapper.ge("create_at", startTime);
        } else {
            queryWrapper.between("create_at", startTime, endTime);
        }

        return userMapper.selectList(queryWrapper);
    }
}
