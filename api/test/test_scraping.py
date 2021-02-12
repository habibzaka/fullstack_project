import unittest 
from backend.scraping import ScrapeData

class TestScraping(unittest.TestCase):
    
    def test_scrape_society_name(self):
        load = ScrapeData("799995782")
        value = load.scrape_society_name()
        expected_value = "BIOSERENITY"
        self.assertEqual(value, expected_value)



if __name__ == '__main__':
    unittest.main()