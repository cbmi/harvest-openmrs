from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException, \
    NoAlertPresentException
import unittest, time


class VerifyDateChooserTest(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.PhantomJS()
        self.driver.implicitly_wait(30)
        self.base_url = "http://0.0.0.0:8000/"
        self.verificationErrors = []
        self.accept_next_alert = True

    def test_verify_date_chooser(self):
        driver = self.driver
        driver.set_window_size(1440, 900)
        driver.get(self.base_url)
        driver.find_element_by_link_text("To The Demo!").click()
        for i in range(60):
            try:
                if self.is_element_present(By.CSS_SELECTOR, "div.heading"): break
            except: pass
            time.sleep(1)
        else: self.fail("time out")
        driver.find_element_by_css_selector("div.heading").click()
        driver.find_element_by_link_text("Age").click()
        for i in range(60):
            try:
                if self.is_element_present(By.CSS_SELECTOR, "g.highcharts-series"): break
            except: pass
            time.sleep(1)
        else: self.fail("time out")
        driver.find_element_by_xpath("//tr[5]/td[7]").click()
        driver.find_element_by_xpath("//div[6]/div/table/tbody/tr[5]/td[7]").click()
        driver.find_element_by_xpath("//div[@id='c1f2']/div[5]/button[2]").click()
        for i in range(60):
            try:
                if self.is_element_present(By.CSS_SELECTOR, "div[data-target=\"description\"]>ul>li"): break
            except: pass
            time.sleep(1)
        else: self.fail("time out")
        self.assertNotEqual("regexpi:Object", driver.find_element_by_css_selector("div[data-target=\"description\"]>ul>li").text)
        driver.find_element_by_css_selector("button.close").click()

    def is_element_present(self, how, what):
        try: self.driver.find_element(by=how, value=what)
        except NoSuchElementException, e: return False
        return True

    def is_alert_present(self):
        try: self.driver.switch_to_alert()
        except NoAlertPresentException, e: return False
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
        finally: self.accept_next_alert = True

    def tearDown(self):
        self.driver.quit()
        self.assertEqual([], self.verificationErrors)

if __name__ == "__main__":
    unittest.main()