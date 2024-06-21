This Is A NodeJS serverside code that you can use to call all the Queries
once you have written and run this program open the localhost url from the web in your postman application 
to create a API.


This code includes the following CRUD operations for the 'DUMMY' table:

Create: POST /createMarker - Adds a new marker to the table.
Read: GET /getMarkers - Retrieves all markers from the table.
Read: GET /getMarker/:id - Retrieves a specific marker by its ID.
Update: PUT /updateMarker/:id - Updates a marker by its ID.
Delete: DELETE /deleteMarker/:id - Deletes a marker by its ID.
Make sure to replace the database connection details (host, user, password, database) with your actual database configuration.


Install these dependencies.
1.Mysql2
2.CORS
3.Express
