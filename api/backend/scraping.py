from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from webdriver_manager.chrome import ChromeDriverManager
import requests


class ScrapeData:

    def __init__(self, siren_number):
        self.siren_number = siren_number

    def scrape_society_name(self):       
        fp = webdriver.FirefoxProfile()
        driver = webdriver.Firefox(firefox_profile=fp)
        driver.maximize_window() # For maximizing window
        driver.implicitly_wait(20) # gives an implicit wait for 20 seconds
        driver.get("https://www.google.com/search?ei=CQohYMrNApDMaIuXpaAG&q=site:www.societe.com%20intitle:" + self.siren_number)
        pages = driver.find_element_by_xpath("//h3[@class='LC20lb DKV0Md']")
        result=pages.get_attribute("innerHTML")
        return result[0]

