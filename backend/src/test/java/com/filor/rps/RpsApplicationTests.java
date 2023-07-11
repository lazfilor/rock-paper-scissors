package com.filor.rps;

import com.filor.rps.configuration.RpsConfiguration;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;

@SpringBootTest
@ContextConfiguration(classes = {RpsConfiguration.class})
class RpsApplicationTests {

	@Test
	void contextLoads() {
	}

}
