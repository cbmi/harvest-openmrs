from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException, \
    NoAlertPresentException
import unittest, time


class VerifyTextBoxValuesVerificationTest(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.PhantomJS()
        self.driver.implicitly_wait(30)
        self.base_url = "http://0.0.0.0:8000/"
        self.verificationErrors = []
        self.accept_next_alert = True

    def test_verify_text_box_values_verification(self):
        driver = self.driver
        driver.get(self.base_url)
        driver.find_element_by_link_text("To The Demo!").click()
        for i in range(60):
            try:
                if self.is_element_present(By.CSS_SELECTOR, "div.heading"):
                    break
            except:
                pass
            time.sleep(1)
        else:
            self.fail("time out")
        driver.find_element_by_css_selector("div.heading").click()
        driver.find_element_by_link_text("MRN").click()
        for i in range(60):
            try:
                if self.is_element_present(By.CSS_SELECTOR, "div.value-item"):
                    break
            except:
                pass
            time.sleep(1)
        else:
            self.fail("time out")
        driver.find_element_by_css_selector("div.value-list > textarea").clear()
        driver.find_element_by_css_selector("div.value-list > textarea").send_keys("MRN000001\nMRN000002\nMRN000006\nMRN000013\nMRN000016\nMRN000017\nKrazyJon\nGoodMRN\nJonnyCash\nLotsOfLove\nBatman")
        try:
            self.assertEqual("true", driver.find_element_by_css_selector("button[data-action=\"apply\"]").get_attribute("disabled"))
        except AssertionError as e:
            self.verificationErrors.append(str(e))
        driver.find_element_by_xpath("//div[@id='c65f83']/div[4]/div/div/div/div/div/div[3]/div/div/div[2]/div/button").click()
        driver.find_element_by_css_selector("div.value-list > textarea").clear()
        driver.find_element_by_css_selector("div.value-list > textarea").send_keys("JonnyCash\nMRN000001\nMRN000002")
        driver.find_element_by_css_selector("div.value-list > textarea").clear()
        driver.find_element_by_css_selector("div.value-list > textarea").send_keys("MRN000001\nMRN000002")
        driver.find_element_by_xpath("//div[@id='c65f83']/div[5]/button[2]").click()
        driver.find_element_by_css_selector("div.context-filter > div > button.btn.btn-mini").click()
        driver.find_element_by_css_selector("span.brand").click()

    def is_element_present(self, how, what):
        try:
            self.driver.find_element(by=how, value=what)
        except NoSuchElementException, e:
            return False
        return True

    def is_alert_present(self):
        try:
            self.driver.switch_to_alert()
        except NoAlertPresentException, e:
            return False
        return True

    def close_alert_and_get_its_text(self):
        try:
            alert = self.driver.switch_to_alert()
            alert_text = alert.text
            if self.accept_next_alert:
                alert.accept()
            else:
                alert.dismiss()
            return alert_text
        finally:
            self.accept_next_alert = True

    def tearDown(self):
        self.driver.quit()
        self.assertEqual([], self.verificationErrors)

if __name__ == "__main__":
    unittest.main()
