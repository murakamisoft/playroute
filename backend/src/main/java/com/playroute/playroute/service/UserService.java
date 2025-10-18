package com.playroute.playroute.service;

import com.playroute.playroute.dto.*;
import com.playroute.playroute.entity.UserEntity;
import com.playroute.playroute.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public List<UserDto> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public UserDto getUser(Integer id) {
        return userRepository.findById(id)
                .map(this::toDto)
                .orElseThrow(() -> new RuntimeException("User not found: " + id));
    }

    public UserDto createUser(UserDto dto) {
        UserEntity entity = UserEntity.builder()
                .userName(dto.getUserName())
                .budgetLimit(dto.getBudgetLimit())
                .defaultTransport(dto.getDefaultTransport())
                .interests(dto.getInterests())
                .createdBy(dto.getCreatedBy())
                .updatedBy(dto.getUpdatedBy())
                .build();
        return toDto(userRepository.save(entity));
    }

    public UserDto updateUser(Integer id, UserDto dto) {
        UserEntity entity = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found: " + id));

        entity.setUserName(dto.getUserName());
        entity.setBudgetLimit(dto.getBudgetLimit());
        entity.setDefaultTransport(dto.getDefaultTransport());
        entity.setInterests(dto.getInterests());
        entity.setUpdatedBy(dto.getUpdatedBy());

        return toDto(userRepository.save(entity));
    }

    public void deleteUser(Integer id) {
        userRepository.deleteById(id);
    }

    private UserDto toDto(UserEntity entity) {
        return UserDto.builder()
                .userId(entity.getUserId())
                .userName(entity.getUserName())
                .budgetLimit(entity.getBudgetLimit())
                .defaultTransport(entity.getDefaultTransport())
                .interests(entity.getInterests())
                .createdAt(entity.getCreatedAt())
                .createdBy(entity.getCreatedBy())
                .updatedAt(entity.getUpdatedAt())
                .updatedBy(entity.getUpdatedBy())
                .build();
    }
}
