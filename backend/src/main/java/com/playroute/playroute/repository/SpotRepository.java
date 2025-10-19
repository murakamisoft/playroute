package com.playroute.playroute.repository;

import com.playroute.playroute.entity.SpotEntity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SpotRepository extends JpaRepository<SpotEntity, Integer> {
}
