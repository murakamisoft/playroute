package com.playroute.playroute.service;

import com.playroute.playroute.dto.PlanDto;
import com.playroute.playroute.dto.SpotDto;
import com.playroute.playroute.entity.PlanEntity;
import com.playroute.playroute.entity.SpotEntity;
import com.playroute.playroute.repository.PlanRepository;
import com.playroute.playroute.repository.SpotRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PlanService {

    private final PlanRepository planRepository;
    private final SpotRepository spotRepository;

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

    /**
     * プランとスポットから、コストに見合ったスポットを提案する
     * 
     * @param planId
     * @return
     */
    public List<SpotDto> getSpotsByPlanId(Integer planId) {
        // プランを取得
        PlanEntity plan = planRepository.findById(planId)
                .orElseThrow(() -> new RuntimeException("プランが見つかりません: " + planId));

        // プランの総コスト
        BigDecimal totalCost = plan.getTotalCost() != null ? plan.getTotalCost() : BigDecimal.ZERO;

        // スポット一覧を取得
        List<SpotEntity> spots = spotRepository.findAll();

        // シャッフルしてランダム順に
        Collections.shuffle(spots);
        List<SpotDto> result = new ArrayList<>();
        BigDecimal currentSum = BigDecimal.ZERO;

        for (SpotEntity spot : spots) {
            if (spot.getCost() == null)
                continue;

            // 合計が totalCost を超えない場合のみ追加
            if (currentSum.add(spot.getCost()).compareTo(totalCost) <= 0) {
                result.add(SpotDto.builder()
                        .spotName(spot.getSpotName())
                        .type(spot.getType())
                        .cost(spot.getCost())
                        .duration(spot.getDuration())
                        .build());

                currentSum = currentSum.add(spot.getCost());
            }

            if (result.size() >= 5)
                break; // 最大5件
        }

        return result;
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
