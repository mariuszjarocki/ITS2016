package.json
------------


- npm install - polecenie inicjujące zależności zawarte w pliku package.json
	          należy je wykonać po pierwszym pobraniu repozytorium.
	          Wynikiem działania polecenia jest katalog zawierający moduły.

Server running
--------------
 

- [środowisko linux]nodejs server / [środowisko windows] node server - uruchamia server

- [środowisko linux]nodejs server -db / [środowisko windows]node server -db  - server uruchamiany z parametrem -db tworzy domyślną 
                                                       bazę danych dbTaskManager

Dodawanie nowej fnkcjonalności
------------------------------

W celu dodania nowej funkcjonalności do projektu należy wykonać następujące kroki 

1.Zdefiniować  model 

- Opis:
	Aby zdefiniować model należy przejść do katalogu  api/dal/models a następnie zdefiniować plik z modelem (analogicznie do już isntniejących).

2.Utworzyć controller

- Opis:
	Aby uwtorzyć nowy controller należy w katalogu api\controllers dodać nowy plik contoroller'a (analogicznie do aktualnie znajdujących się w katalogu) .

3.Zarejestrować route'a

- Opis:
	W celu  utworzenia route'ingu należy dodać nowy plik w katalogu api\routes (analogicznie do już istniejących).


Po wykonaniu powyższych punktów możemy wysyłać żądania do API, posługując się zdefiniowanym route'ingiem.
