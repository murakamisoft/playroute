package com.playroute.playroute.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "m_spot")
public class SpotEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer spotId;

    private String spotName;

    private String type;

    private BigDecimal lat;

    private BigDecimal lng;

    private BigDecimal cost;

    private String duration;

    private String description;

    private LocalDateTime createdAt = LocalDateTime.now();

    private String createdBy;

    private LocalDateTime updatedAt = LocalDateTime.now();

    private String updatedBy;

}
