import java.io.IOException;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class JacksonUtil {
	
	public static Object jsonToJava(String json, Class c) {
		ObjectMapper om = new ObjectMapper();
		Object jsonPersonne;
		try {
			jsonPersonne = om.readValue(json, c);
			return jsonPersonne;
		} catch (JsonParseException e) {
			return null;
		} catch (JsonMappingException e) {
			return null;
		} catch (IOException e) {
			return null;
		}
		
	}
	
	public static String javaToJson(Object o) {
		ObjectMapper om = new ObjectMapper();
		String jsonSortie;
		try {
			jsonSortie = om.writeValueAsString(o);
		} catch (JsonProcessingException e) {
			return null;
		}
		return jsonSortie;
	}

}
