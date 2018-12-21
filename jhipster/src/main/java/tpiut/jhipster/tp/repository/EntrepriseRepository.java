package tpiut.jhipster.tp.repository;

import tpiut.jhipster.tp.domain.Entreprise;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Entreprise entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EntrepriseRepository extends JpaRepository<Entreprise, Long> {

}
