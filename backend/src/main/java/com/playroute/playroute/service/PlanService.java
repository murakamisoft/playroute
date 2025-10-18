package com.playroute.playroute.service;

import com.playroute.playroute.dto.PlanDto;
import com.playroute.playroute.entity.PlanEntity;
import com.playroute.playroute.repository.PlanRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PlanService {

    private final PlanRepository planRepository;

    public List<PlanDto> getAllPlans() {
        return planRepository.findAll()
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public PlanDto getPlan(Integer id) {
        return planRepository.findById(id)
                .map(this::toDto)
                .orElseThrow(() -> new RuntimeException("Plan not found: " + id));
    }

    public PlanDto createPlan(PlanDto dto) {

        PlanEntity entity = PlanEntity.builder()
                .userId(dto.getUserId())
                .startTime(dto.getStartTime())
                .endTime(dto.getEndTime())
                .totalCost(dto.getTotalCost())
                .spots(dto.getSpots())
                .createdBy(dto.getCreatedBy())
                .updatedBy(dto.getUpdatedBy())
                .build();
        return toDto(planRepository.save(entity));
    }

    private PlanDto toDto(PlanEntity entity) {

        return PlanDto.builder()
                .planId(entity.getPlanId())
                .userId(entity.getUserId())
                .startTime(entity.getStartTime())
                .endTime(entity.getEndTime())
                .totalCost(entity.getTotalCost())
                .spots(entity.getSpots())
                .createdAt(entity.getCreatedAt())
                .createdBy(entity.getCreatedBy())
                .updatedAt(entity.getUpdatedAt())
                .updatedBy(entity.getUpdatedBy())
                .build();
    }
}
