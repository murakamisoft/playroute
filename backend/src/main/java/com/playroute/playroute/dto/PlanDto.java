package com.playroute.playroute.dto;

import lombok.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

// 表示用
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PlanDto {
    private Integer planId;
    private Integer userId;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private Double totalCost;
    private List<Map<String, Object>> spots;
    private LocalDateTime createdAt;
    private String createdBy;
    private LocalDateTime updatedAt;
    private String updatedBy;
}
