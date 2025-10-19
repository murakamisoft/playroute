package com.playroute.playroute.controller;

import java.math.BigDecimal;
import java.util.List;
import java.util.Objects;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.playroute.playroute.dto.PlanSpotDto;
import com.playroute.playroute.dto.SpotDto;
import com.playroute.playroute.service.PlanService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/spots")
@RequiredArgsConstructor
public class SpotController {

    private final PlanService planService;

    @GetMapping("/{planId}")
    public PlanSpotDto getPlanSpots(@PathVariable Integer planId) {
        // DBからスポット情報を取得
        List<SpotDto> spots = planService.getSpotsByPlanId(planId);

        // 合計費用を計算
        BigDecimal totalCost = spots.stream()
                .map(SpotDto::getCost)
                .filter(Objects::nonNull)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        return new PlanSpotDto(totalCost, spots);
    }
}
