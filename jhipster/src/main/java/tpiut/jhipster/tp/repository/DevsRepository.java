package tpiut.jhipster.tp.repository;

import tpiut.jhipster.tp.domain.Devs;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Devs entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DevsRepository extends JpaRepository<Devs, Long> {

}
