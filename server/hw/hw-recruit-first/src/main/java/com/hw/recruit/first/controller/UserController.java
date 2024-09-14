package com.hw.recruit.first.controller;

import com.hw.common.domain.R;
import com.hw.recruit.first.domain.dto.UserDTO;
import com.hw.recruit.first.domain.po.User;
import com.hw.recruit.first.service.IUserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

@RestController
@RequestMapping("/recruit/apply")
@Api(tags = "招新一面相关接口")
public class UserController {

    @Resource
    private IUserService userService;

    @PostMapping
    @ApiOperation("提交招新申请表单")
    //提交招新申请表单
    public R<Void> submitRecruitApply(@RequestBody UserDTO userDTO) {
        userService.insert(userDTO);
        return R.ok(null);
    }

    @GetMapping("/{id}")
    @ApiOperation("获取招新申请表单")
    // 获取招新申请表单
    public R<User> getRecruitApply(@PathVariable Integer id) {
        User user = userService.selectById(id);
        return R.ok(user);
    }

    @GetMapping
    @ApiOperation("获取招新列表")
    // 获取招新列表
    public R<List<User>> getRecruitList(@RequestParam("timeFrame") List<String> timeFrame) {
        List<User> userList = userService.getUsersWithinTimeFrame(timeFrame);
        return R.ok(userList);
    }

    @PutMapping("/{id}/{status}")
    @ApiOperation("修改招新申请表单状态")
    // 修改招新申请表单状态
    public R<Void> modifyRecruitApplyStatus(@PathVariable Integer id, @PathVariable Integer status) {
        userService.updateById(new User().setId(id).setStatus(status));
        return R.ok(null);
    }
}
