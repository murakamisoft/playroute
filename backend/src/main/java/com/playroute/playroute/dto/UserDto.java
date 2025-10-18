package com.playroute.playroute.dto;

import lombok.*;
import java.time.LocalDateTime;

// 表示用
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
	private Integer userId;
	private String userName;
	private Double budgetLimit;
	private String defaultTransport;
	private String interests;
	private LocalDateTime createdAt;
	private String createdBy;
	private LocalDateTime updatedAt;
	private String updatedBy;
}
