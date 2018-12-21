package tpiut.jhipster.tp.web.rest;

import com.codahale.metrics.annotation.Timed;
import tpiut.jhipster.tp.domain.Devs;
import tpiut.jhipster.tp.repository.DevsRepository;
import tpiut.jhipster.tp.web.rest.errors.BadRequestAlertException;
import tpiut.jhipster.tp.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Devs.
 */
@RestController
@RequestMapping("/api")
public class DevsResource {

    private final Logger log = LoggerFactory.getLogger(DevsResource.class);

    private static final String ENTITY_NAME = "devs";

    private final DevsRepository devsRepository;

    public DevsResource(DevsRepository devsRepository) {
        this.devsRepository = devsRepository;
    }

    /**
     * POST  /devs : Create a new devs.
     *
     * @param devs the devs to create
     * @return the ResponseEntity with status 201 (Created) and with body the new devs, or with status 400 (Bad Request) if the devs has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/devs")
    @Timed
    public ResponseEntity<Devs> createDevs(@RequestBody Devs devs) throws URISyntaxException {
        log.debug("REST request to save Devs : {}", devs);
        if (devs.getId() != null) {
            throw new BadRequestAlertException("A new devs cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Devs result = devsRepository.save(devs);
        return ResponseEntity.created(new URI("/api/devs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /devs : Updates an existing devs.
     *
     * @param devs the devs to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated devs,
     * or with status 400 (Bad Request) if the devs is not valid,
     * or with status 500 (Internal Server Error) if the devs couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/devs")
    @Timed
    public ResponseEntity<Devs> updateDevs(@RequestBody Devs devs) throws URISyntaxException {
        log.debug("REST request to update Devs : {}", devs);
        if (devs.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Devs result = devsRepository.save(devs);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, devs.getId().toString()))
            .body(result);
    }

    /**
     * GET  /devs : get all the devs.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of devs in body
     */
    @GetMapping("/devs")
    @Timed
    public List<Devs> getAllDevs() {
        log.debug("REST request to get all Devs");
        return devsRepository.findAll();
    }

    /**
     * GET  /devs/:id : get the "id" devs.
     *
     * @param id the id of the devs to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the devs, or with status 404 (Not Found)
     */
    @GetMapping("/devs/{id}")
    @Timed
    public ResponseEntity<Devs> getDevs(@PathVariable Long id) {
        log.debug("REST request to get Devs : {}", id);
        Optional<Devs> devs = devsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(devs);
    }

    /**
     * DELETE  /devs/:id : delete the "id" devs.
     *
     * @param id the id of the devs to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/devs/{id}")
    @Timed
    public ResponseEntity<Void> deleteDevs(@PathVariable Long id) {
        log.debug("REST request to delete Devs : {}", id);

        devsRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
