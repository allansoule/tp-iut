package tpiut.jhipster.tp.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Entreprise.
 */
@Entity
@Table(name = "entreprise")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Entreprise implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "nom")
    private String nom;

    @Column(name = "lieu")
    private String lieu;

    @OneToMany(mappedBy = "entreprise")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Devs> devs = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public Entreprise nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getLieu() {
        return lieu;
    }

    public Entreprise lieu(String lieu) {
        this.lieu = lieu;
        return this;
    }

    public void setLieu(String lieu) {
        this.lieu = lieu;
    }

    public Set<Devs> getDevs() {
        return devs;
    }

    public Entreprise devs(Set<Devs> devs) {
        this.devs = devs;
        return this;
    }

    public Entreprise addDevs(Devs devs) {
        this.devs.add(devs);
        devs.setEntreprise(this);
        return this;
    }

    public Entreprise removeDevs(Devs devs) {
        this.devs.remove(devs);
        devs.setEntreprise(null);
        return this;
    }

    public void setDevs(Set<Devs> devs) {
        this.devs = devs;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Entreprise entreprise = (Entreprise) o;
        if (entreprise.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), entreprise.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Entreprise{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            ", lieu='" + getLieu() + "'" +
            "}";
    }
}
