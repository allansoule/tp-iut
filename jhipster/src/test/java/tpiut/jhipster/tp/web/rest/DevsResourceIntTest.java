package tpiut.jhipster.tp.web.rest;

import tpiut.jhipster.tp.TpiutjhipsterApp;

import tpiut.jhipster.tp.domain.Devs;
import tpiut.jhipster.tp.repository.DevsRepository;
import tpiut.jhipster.tp.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;


import static tpiut.jhipster.tp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the DevsResource REST controller.
 *
 * @see DevsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TpiutjhipsterApp.class)
public class DevsResourceIntTest {

    private static final String DEFAULT_NOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM = "BBBBBBBBBB";

    private static final String DEFAULT_PRENOM = "AAAAAAAAAA";
    private static final String UPDATED_PRENOM = "BBBBBBBBBB";

    private static final String DEFAULT_ADRESSE = "AAAAAAAAAA";
    private static final String UPDATED_ADRESSE = "BBBBBBBBBB";

    @Autowired
    private DevsRepository devsRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restDevsMockMvc;

    private Devs devs;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DevsResource devsResource = new DevsResource(devsRepository);
        this.restDevsMockMvc = MockMvcBuilders.standaloneSetup(devsResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Devs createEntity(EntityManager em) {
        Devs devs = new Devs()
            .nom(DEFAULT_NOM)
            .prenom(DEFAULT_PRENOM)
            .adresse(DEFAULT_ADRESSE);
        return devs;
    }

    @Before
    public void initTest() {
        devs = createEntity(em);
    }

    @Test
    @Transactional
    public void createDevs() throws Exception {
        int databaseSizeBeforeCreate = devsRepository.findAll().size();

        // Create the Devs
        restDevsMockMvc.perform(post("/api/devs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(devs)))
            .andExpect(status().isCreated());

        // Validate the Devs in the database
        List<Devs> devsList = devsRepository.findAll();
        assertThat(devsList).hasSize(databaseSizeBeforeCreate + 1);
        Devs testDevs = devsList.get(devsList.size() - 1);
        assertThat(testDevs.getNom()).isEqualTo(DEFAULT_NOM);
        assertThat(testDevs.getPrenom()).isEqualTo(DEFAULT_PRENOM);
        assertThat(testDevs.getAdresse()).isEqualTo(DEFAULT_ADRESSE);
    }

    @Test
    @Transactional
    public void createDevsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = devsRepository.findAll().size();

        // Create the Devs with an existing ID
        devs.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDevsMockMvc.perform(post("/api/devs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(devs)))
            .andExpect(status().isBadRequest());

        // Validate the Devs in the database
        List<Devs> devsList = devsRepository.findAll();
        assertThat(devsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllDevs() throws Exception {
        // Initialize the database
        devsRepository.saveAndFlush(devs);

        // Get all the devsList
        restDevsMockMvc.perform(get("/api/devs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(devs.getId().intValue())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM.toString())))
            .andExpect(jsonPath("$.[*].prenom").value(hasItem(DEFAULT_PRENOM.toString())))
            .andExpect(jsonPath("$.[*].adresse").value(hasItem(DEFAULT_ADRESSE.toString())));
    }
    
    @Test
    @Transactional
    public void getDevs() throws Exception {
        // Initialize the database
        devsRepository.saveAndFlush(devs);

        // Get the devs
        restDevsMockMvc.perform(get("/api/devs/{id}", devs.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(devs.getId().intValue()))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM.toString()))
            .andExpect(jsonPath("$.prenom").value(DEFAULT_PRENOM.toString()))
            .andExpect(jsonPath("$.adresse").value(DEFAULT_ADRESSE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingDevs() throws Exception {
        // Get the devs
        restDevsMockMvc.perform(get("/api/devs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDevs() throws Exception {
        // Initialize the database
        devsRepository.saveAndFlush(devs);

        int databaseSizeBeforeUpdate = devsRepository.findAll().size();

        // Update the devs
        Devs updatedDevs = devsRepository.findById(devs.getId()).get();
        // Disconnect from session so that the updates on updatedDevs are not directly saved in db
        em.detach(updatedDevs);
        updatedDevs
            .nom(UPDATED_NOM)
            .prenom(UPDATED_PRENOM)
            .adresse(UPDATED_ADRESSE);

        restDevsMockMvc.perform(put("/api/devs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDevs)))
            .andExpect(status().isOk());

        // Validate the Devs in the database
        List<Devs> devsList = devsRepository.findAll();
        assertThat(devsList).hasSize(databaseSizeBeforeUpdate);
        Devs testDevs = devsList.get(devsList.size() - 1);
        assertThat(testDevs.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testDevs.getPrenom()).isEqualTo(UPDATED_PRENOM);
        assertThat(testDevs.getAdresse()).isEqualTo(UPDATED_ADRESSE);
    }

    @Test
    @Transactional
    public void updateNonExistingDevs() throws Exception {
        int databaseSizeBeforeUpdate = devsRepository.findAll().size();

        // Create the Devs

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDevsMockMvc.perform(put("/api/devs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(devs)))
            .andExpect(status().isBadRequest());

        // Validate the Devs in the database
        List<Devs> devsList = devsRepository.findAll();
        assertThat(devsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDevs() throws Exception {
        // Initialize the database
        devsRepository.saveAndFlush(devs);

        int databaseSizeBeforeDelete = devsRepository.findAll().size();

        // Get the devs
        restDevsMockMvc.perform(delete("/api/devs/{id}", devs.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Devs> devsList = devsRepository.findAll();
        assertThat(devsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Devs.class);
        Devs devs1 = new Devs();
        devs1.setId(1L);
        Devs devs2 = new Devs();
        devs2.setId(devs1.getId());
        assertThat(devs1).isEqualTo(devs2);
        devs2.setId(2L);
        assertThat(devs1).isNotEqualTo(devs2);
        devs1.setId(null);
        assertThat(devs1).isNotEqualTo(devs2);
    }
}
