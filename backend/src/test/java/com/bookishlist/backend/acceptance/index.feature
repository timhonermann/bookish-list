Feature: Index Controller

  Background:
    * url baseUrl

  Scenario: Get Index Value
    Given path '/'
    When method get
    Then status 200
    And match response == 'Bookish List API'

