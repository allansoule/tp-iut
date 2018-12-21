import static org.junit.Assert.*;

import java.io.IOException;

import org.junit.Test;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import junit.framework.Assert;

public class jsonParserTest {

	@SuppressWarnings("deprecation")
	@Test
	public void jsonToJavaTest() {
		//Given
		String json = "{\"nom\":\"Allan\",\"adresse\":{\"codePostal\":\"93320\",\"numRue\":\"9\",\"libelle\":\"avenue du Général Leclerc\"}}";
		Adresse a = new Adresse("93320", "9", "avenue du Général Leclerc");
		Personne personne = new Personne("Allan", a);
		
		//When
		Personne jsonPersonne = (Personne) JacksonUtil.jsonToJava(json, Personne.class);
		
		//Then
		Assert.assertEquals(personne, jsonPersonne);

		
	}
	
	@SuppressWarnings("deprecation")
	@Test
	public void javaToJsonTest() throws JsonProcessingException {
		//Given
		String jsonEntree = "{\"nom\":\"Allan\",\"adresse\":{\"codePostal\":\"93320\",\"numRue\":\"9\",\"libelle\":\"avenue du Général Leclerc\"}}";
		Adresse a = new Adresse("93320", "9", "avenue du Général Leclerc");
		Personne personne = new Personne("Allan", a);
		ObjectMapper om = new ObjectMapper();
		
		//When
		String jsonSortie = JacksonUtil.javaToJson(personne);
		
		//Then
		Assert.assertEquals(jsonEntree, jsonSortie);

		
		

	}
}
