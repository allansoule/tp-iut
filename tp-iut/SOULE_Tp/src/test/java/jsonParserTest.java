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

		String json = "{\"nom\":\"Allan\",\"adresse\":{\"codePostal\":\"93320\",\"numRue\":\"9\",\"libelle\":\"avenue du Général Leclerc\"}}";
		ObjectMapper om = new ObjectMapper();

		try {
			Personne jsonPersonne = om.readValue(json, Personne.class);
			Adresse a = new Adresse("93320", "9", "avenue du Général Leclerc");
			Personne personne = new Personne("Allan", a);
			Assert.assertEquals(personne, jsonPersonne);
		} catch (JsonParseException e) {
			e.printStackTrace();
			fail();
		} catch (JsonMappingException e) {
			e.printStackTrace();
			fail();
		} catch (IOException e) {
			e.printStackTrace();
			fail();
		}
		
	}
	
	@SuppressWarnings("deprecation")
	@Test
	public void javaToJsonTest() {
		String jsonEntree = "{\"nom\":\"Allan\",\"adresse\":{\"codePostal\":\"93320\",\"numRue\":\"9\",\"libelle\":\"avenue du Général Leclerc\"}}";
		Adresse a = new Adresse("93320", "9", "avenue du Général Leclerc");
		Personne personne = new Personne("Allan", a);
		ObjectMapper om = new ObjectMapper();
		try {
			String jsonSortie = om.writeValueAsString(personne);
			Assert.assertEquals(jsonEntree, jsonSortie);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		
		

	}
}
