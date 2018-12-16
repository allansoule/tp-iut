
public class Adresse {
	
	String codePostal;
	String numRue;
	String libelle;
	
	
	public Adresse(String codePostal, String numRue, String libelle) {
		super();
		this.codePostal = codePostal;
		this.numRue = numRue;
		this.libelle = libelle;
	}
	
	
	
	public Adresse() {
		super();
	}



	public String getCodePostal() {
		return codePostal;
	}
	public void setCodePostal(String codePostal) {
		this.codePostal = codePostal;
	}
	public String getNumRue() {
		return numRue;
	}
	public void setNumRue(String numRue) {
		this.numRue = numRue;
	}
	public String getLibelle() {
		return libelle;
	}
	public void setLibelle(String libelle) {
		this.libelle = libelle;
	}
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((codePostal == null) ? 0 : codePostal.hashCode());
		result = prime * result + ((libelle == null) ? 0 : libelle.hashCode());
		result = prime * result + ((numRue == null) ? 0 : numRue.hashCode());
		return result;
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Adresse other = (Adresse) obj;
		if (codePostal == null) {
			if (other.codePostal != null)
				return false;
		} else if (!codePostal.equals(other.codePostal))
			return false;
		if (libelle == null) {
			if (other.libelle != null)
				return false;
		} else if (!libelle.equals(other.libelle))
			return false;
		if (numRue == null) {
			if (other.numRue != null)
				return false;
		} else if (!numRue.equals(other.numRue))
			return false;
		return true;
	}
	
	
	

}
