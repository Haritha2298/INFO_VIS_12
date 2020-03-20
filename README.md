# Information Visualization - Discover Amsterdam 

## Introduction:
Discover Amsterdam is a visualization project done for the course Information Visualization at the University of Amsterdam. The project is aimed at providing a Visual representation of the important and essential places in Amsterdam like the Metro stops, Tram stops etc. and also objects like tree, trashcans. These objects and the places are plotted onto Amsterdam's Map. As part of the project, we do offer some features to enhance the information to the user.  

## What a user can do with the Map?

Discover Amsterdam gives the user four different features to work with. This allows the users to get as much information from the available data. Following are the features:

1. Selection of Marker Points: The model allows the user to select one or more items from the list of available items in the dropdown. Clicking on the Submit button, plots the markers onto the map. This gives a clear representation of where these objects are located in Amsterdam.
2. Polygon Comparison: As part of the implementation, the project comes with a draw polygon and compare feature. The user is allowed to draw any number of polygons on the map using the Draw polygon tool. Clicking on the Compare Polygons button will give a detailed insight into the number of object present in the areas of the polygons. This allows the user to compare the different areas of Amsterdam.

3. Neighbourhood Comparison: We also give a standard neighbourhood comparison feature. This allows the user to compare the predefined neighbourhoods of Amsterdam. The output is the comparison of objects between the neighbourhoods and this is more of a predefined feature.
Clicking on the compare neighbourhoods button activates the feature.
4. Panorama View: We have made two views available as part of the project. Clicking on the Switch to Panorama button, removes all the object markers from the map and replaces them with panorama markers. Clicking on a panorama marker, opens the panoramic view of that particular place.

## Who are the Target groups for this projects?

The project is aimed at reaching the general public. It can be used as a map by a common man to track the areas of Amsterdam. Using the map one can get to know the nearest stops for tram and metro, nearest playground and it also can help the city planning authorities and the municipal departments to understan how a particular area fares in comparison to the other. With the Panorama view, a person can experience the place before even actually going there. So the project is targetted to be useful by all sections of the people.

## Application Structure:

Discover Amsterdam is a web application. The application is hosted on a local development server with the help of Python's Flask library. The Application was built using frontend based development languages like HTML,CSS and Javascript. The visualizations were built using the  D3.js library of Javascript. The dataset used in the project is obtained from <https://vps.inskegroenen.nl/api>.

## How to run the Application?
1) Download the repository.
2) From a python command line interface, type in the following code
                 <pre>                         python run.py                                      </pre>
3)After executing, type in the following line to start the development server
                 <pre>                         flask run                                      </pre>
4)This will stop the Flask development server which will be running at <http://127.0.0.1:5000/> . 

5)Go to the link and experience - Discover Amsterdam.

## Contributors:
1) Nils Lehmann
2) Haritha Jayaraman
3) Nihat Uzunalioglu
4) Leon Bakker
5) Kailainathan Muthiah Kasinathan
