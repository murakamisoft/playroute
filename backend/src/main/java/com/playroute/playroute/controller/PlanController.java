package com.playroute.playroute.controller;

import com.playroute.playroute.dto.PlanDto;
import com.playroute.playroute.service.PlanService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/plans")
@RequiredArgsConstructor
public class PlanController {

    private final PlanService planService;

    @GetMapping
    public List<PlanDto> getAllPlans() {
        return planService.getAllPlans();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public PlanDto createPlan(@RequestBody PlanDto dto) {
        return planService.createPlan(dto);
    }

    @GetMapping("/{planId}")
    public PlanDto getPlan(@PathVariable Integer planId) {
        return planService.getPlan(planId);
    }
}
