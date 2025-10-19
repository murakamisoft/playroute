package com.playroute.playroute.dto;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SpotDto {

    private String spotName;
    private String type;
    private BigDecimal cost;
    private String duration;

}
