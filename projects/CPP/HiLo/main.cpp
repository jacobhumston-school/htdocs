
/***************************************************************************
 *                                                                         *
 *   Copyright (C) 2008 by mr c                                            *
 *   mrc@bloodberry                                                        *
 *                                                                         *
 *   This program is free software; you can redistribute it and/or modify  *
 *   it under the terms of the GNU General Public License as published by  *
 *   the Free Software Foundation; either version 2 of the License, or     *
 *   (at your option) any later version.                                   *
 *                                                                         *
 *   This program is distributed in the hope that it will be useful,       *
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of        *
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the         *
 *   GNU General Public License for more details.                          *
 *                                                                         *
 *   You should have received a copy of the GNU General Public License     *
 *   along with this program; if not, write to the                         *
 *   Free Software Foundation, Inc.,                                       *
 *   59 Temple Place - Suite 330, Boston, MA  02111-1307, USA.             *
 *                                                                         *
 ***************************************************************************/

#ifdef HAVE_CONFIG_H
#include <config.h>
#endif

// ---------------------------
// --->  System includes  <---
// ---------------------------

#include <stdio.h>
#include <stdlib.h>
#include <iostream>

// ---------------------------
// --->  My Variables  <---
// ---------------------------

int PickedNumber = 0;
int Guess = 0;
char Ready = 0;
int Score = 0;
bool StillGuessing = true;

// ---------------------------
// --->  My Functions  <---
// ---------------------------

using namespace std;

int main()
{
	system("clear");

	cout << "\t\t __        __   _                          _ " << endl;
	cout << "\t\t \\ \\      / /__| | ___ ___  _ __ ___   ___| |" << endl;
	cout << "\t\t  \\ \\ /\\ / / _ \\ |/ __/ _ \\| '_ ` _ \\ / _ \\ |" << endl;
	cout << "\t\t   \\ V  V /  __/ | (_| (_) | | | | | |  __/_|" << endl;
	cout << "\t\t    \\_/\\_/ \\___|_|\\___\\___/|_| |_| |_|\\___(_)" << endl;

	srand(time(NULL));

	printf("\n\n\t\t> Welcome to a game called \"Hi / Low\".");
	printf("\n\t\t> I'll count how many guesses it took you to guess my number.");
	printf("\n\t\t> Your amount of guesses will determine your score. (1 guess is 1 score.)");
	printf("\n\t\t> Number will be between 1 and 100.\n");

	printf("\n\t\t> Are you ready?\n\t\t> (Y/N) --> ");

	cin >> Ready;

	PickedNumber = rand() % 100 + 1;

	system("clear");

	printf("\n\t\t> Please enter your first guess.\n\t\t> --> ");

	while (StillGuessing == true)
	{

		cin >> Guess;
		Score++;

		if (Guess == PickedNumber)
		{
			system("clear");
			cout << "\n\t\t> You guessed my number! (" << PickedNumber << ")";
			StillGuessing = false;
			cout << "\n\t\t> Your score: " << Score << " (The lower the better!)" << endl;
		}
		else if (Guess > PickedNumber)
		{
			system("clear");
			cout << "\n\t\t> Your guess was too high! (" << Guess << ")\n\t\t> Guess Again --> ";
		}
		else
		{
			system("clear");
			cout << "\n\t\t> Your guess was too low! (" << Guess << ")\n\t\t> Guess Again --> ";
		}
	}

	return 0;
}
