package com.playroute.playroute.controller;

import com.playroute.playroute.dto.*;
import com.playroute.playroute.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

  private final UserService userService;

  @GetMapping
  public List<UserDto> getAll() {
    return userService.getAllUsers();
  }

  @GetMapping("/{userId}")
  public UserDto get(@PathVariable Integer userId) {
    return userService.getUser(userId);
  }

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public UserDto create(@RequestBody UserCreateDto dto) {
    return userService.createUser(dto);
  }

  @PutMapping("/{userId}")
  public UserDto update(@PathVariable Integer userId, @RequestBody UserUpdateDto dto) {
    return userService.updateUser(userId, dto);
  }

  @DeleteMapping("/{userId}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void delete(@PathVariable Integer userId) {
    userService.deleteUser(userId);
  }
}
