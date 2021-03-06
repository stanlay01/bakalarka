%FEIstyle v1.2e
%Sablona pre pisanie zaverecnych prac pre FEI STU v Bratislave
%autor: Michal Liziciar
%
%* -defaultne nastavene pre odbor API
% Argumenty sablony:
% dp - diplomova praca / bp - bakalarska praca 
% article*  / book - styl prace
% en - praca pisana v anglickom jazyku 
% m / z - typ skllonovania textu (muz / zena), *defaultny je obojtvar (a)
% windows1250* / utf8 - kodovanie textu
%Zoznam funkcii:
%\FEIauthor
%\FEIschool,\FEIschoolEn*
%\FEItitle,\FEItitleEn
%\FEIfaculty,\FEIfacultyEn*
%\FEIregNr
%\FEIdate{day}{month}{year}*
%\FEIstudyProgramme,\FEIstudyProgrammeEn*
%\FEIstudyFieldNumber*
%\FEIstudyField*,\FEIstudyFieldEn*
%\FEItrainingWorkplace*
%\FEIsupervisor
%\FEIconsultant
%\FEIplace*
%
%\FEIcover
%\FEItitlePage
%\FEIdeclaration
%\FEIthanks{[nazov suboru]}* %moznost zmenit text podakovania
%\FEIassignment{subor}
%\FEIabstract{subor}{klucove slova}
%\FEIabstractEn{subor}{klucove slova}
%\FEIcontent
%\FEIlistOfTables
%\FEIlistOfFigures
%\FEIlistOfFiguresAndTables
%\FEIlistOfAbbreviations{subor}
%\FEIlistOfSymbols{subor}
%\FEIlistOfAbbreviationsAndSymbols{subor}
%\FEIlistOfAlgorithms
%\FEIintroduction{subor}
%\FEIcore{subor}
%\FEIconclusion{subor}
%\FEIresume{subor}
%\FEIbibliography{subor}{subor}
%\FEIlistOfAppendix
%\FEIappendix{nazov}{subor}
%\FEIpdfInfo
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
\NeedsTeXFormat{LaTeX2e}
\ProvidesClass{FEIstyle}[2014/07/22 v. 1.2c Sablona pre pisanie zaverecnych prac - FEI STUBA]	

% spracovanie argumentov
\DeclareOption{dp}{\def\typPraceSkr{d}
						\def\typPrace{Diplomov\a'a pr\a'aca}		
						\def\typPraceTemp{diplomov\'{u} pr\'{a}cu}
						\def\typPraceEn{Diploma Thesis}	
						\def\typPraceTempII{diplomovej pr\'{a}ce}}
\DeclareOption{bp}{\def\typPraceSkr{b}
						\def\typPrace{Bakal\a'arska pr\a'aca}		
						\def\typPraceTemp{bakal\'{a}rsku pr\'{a}cu}  
						\def\typPraceEn{Bachelor Thesis}
						\def\typPraceTempII{bakal\'{a}rskej pr\'{a}ce}}

\newcommand*\myset{a4paper,12pt}
\newcommand*\parentclass{article}

\DeclareOption{article}{
  \renewcommand*\myset{a4paper,12pt}
  \renewcommand*\parentclass{article}
}
\DeclareOption{book}{
  \renewcommand*\myset{a4paper,12pt}
  \renewcommand*\parentclass{book}
}

\def\FEIenglish{0}
\DeclareOption{en}{
  \def\FEIenglish{1} 
}

\def\FEIcoding{0}
\DeclareOption{utf8}{
  \def\FEIcoding{1} 
}

\def\FEIgen{0}
\DeclareOption{m}{
  \def\FEIgen{1} 
}
\DeclareOption{z}{
  \def\FEIgen{2} 
}

\ProcessOptions
\ExecuteOptions{dp}
\LoadClass[\myset]{\parentclass}

\usepackage{times}
\usepackage[overload]{textcase}
\usepackage{chngcntr}  
\usepackage{tocloft}
\usepackage{ifmtarg}
\usepackage[bookmarksopen,colorlinks,plainpages=false,urlcolor=blue,hypertexnames=false]{hyperref}
\usepackage{rotating}
\usepackage{anysize}
\usepackage{xifthen}
\usepackage{sectsty}
\usepackage{amsmath}
\usepackage{xstring}
\usepackage[compact]{titlesec}
\usepackage{algorithm}
\usepackage{xcolor}
\usepackage{listings}
\usepackage{lmodern}
\usepackage[slovak,english]{babel}
\usepackage[T1]{fontenc} 
\usepackage{changepage}
\usepackage{scrextend}
\usepackage{xstring}

\IfEqCase*{\FEIcoding}{
   		 {0}{
			\usepackage[cp1250]{inputenc}				
		}
		 {1}{
			\usepackage[utf8x]{inputenc}			
		}
}[]
%definovanie globalnych premennych 
\def\@nedefnovane{! UNDEFINED: \textbackslash}

\def\@skola{Slovensk\a'a technick\a'a  univerzita v Bratislave}
\def\FEIschool#1{\def\@skola{#1}}
\newcommand{\printSkola}{\@skola}
\def\@skolaEn{Slovak University of Technology in Bratislava}
\def\FEIschoolEn#1{\def\@skolaEn{#1}}
\newcommand{\printSkolaEn}{\@skolaEn}


\def\@fakulta{Fakulta elektrotechniky a informatiky}
\def\FEIfaculty#1{\def\@fakulta{#1}}
\newcommand{\printFakulta}{\@fakulta}
\def\@fakultaEn{Faculty of Electrical Engineering and Information Technology}
\def\FEIfacultyEn#1{\def\@fakultaEn{#1}}
\newcommand{\printFakultaEn}{\@fakultaEn}

\def\@autor{\@nedefnovane FEIauthor}
\def\FEIauthor#1{\def\@autor{#1}}
\newcommand{\printAutor}{\@autor}

\def\@nazov{\@nedefnovane FEItitle}
\def\FEItitle#1{\def\@nazov{#1}}
\newcommand{\printNazov}{\@nazov}
\def\@nazovEn{\@nedefnovane FEItitleEn}
\def\FEItitleEn#1{\def\@nazovEn{#1}}
\newcommand{\printNazovEn}{\@nazovEn}

\def\@evidencneCislo{\@nedefnovane FEIregNr}
\def\FEIregNr#1{\def\@evidencneCislo{#1}}
\newcommand{\printEvidencneCislo}{\@evidencneCislo}

\def\@den{\number\day}
\def\@mesiac{\number\month}
\def\@rok{\number\year}
\newcommand\FEIdate[3]{\def\@den{#1}
								 \def\@mesiac{#2}
				 				 \def\@rok{#3}}
\newcommand{\printDatum}{\@den.\@mesiac.\@rok}

\def\@studijnyProgram{Aplikovan\a'a informatika}
\def\FEIstudyProgramme#1{\def\@studijnyProgram{#1}}
\newcommand{\printStudijnyProgram}{\@studijnyProgram}
\def\@studijnyProgramEn{Applied Informatics}
\def\FEIstudyProgrammeEn#1{\def\@studijnyProgramEn{#1}}
\newcommand{\printStudijnyProgramEn}{\@studijnyProgramEn}

\def\@cisloStudijnehoOdboru{2511}
\def\FEIstudyFieldNumber#1{\def\@cisloStudijnehoOdboru{#1}}
\newcommand{\printCisloStudijnehoOdboru}{\@cisloStudijnehoOdboru}

\def\@nazovStudijnehoOdboru{9.2.9 Aplikovan\a'a informatika}
\def\FEIstudyField#1{\def\@nazovStudijnehoOdboru{#1}}
\newcommand{\printNazovStudijnehoOdboru}{\@nazovStudijnehoOdboru}

\def\@nazovStudijnehoOdboruEn{9.2.9 Applied Informatics}
\def\FEIstudyFieldEn#1{\def\@nazovStudijnehoOdboruEn{#1}}
\newcommand{\printNazovStudijnehoOdboruEn}{\@nazovStudijnehoOdboruEn}

\def\@skoliacePracovisko{\a'Ustav informatiky a matematiky}
\def\FEItrainingWorkplace#1{\def\@skoliacePracovisko{#1}}
\newcommand{\printSkoliacePracovisko}{\@skoliacePracovisko}

\def\@skoliacePracoviskoEn{Institute of Computer Science and Mathematics}
\def\FEItrainingWorkplaceEn#1{\def\@skoliacePracoviskoEn{#1}}
\newcommand{\printSkoliacePracoviskoEn}{\@skoliacePracoviskoEn}

\def\@veduciZaverecnejPrace{\@nedefnovane FEIsupervisor}
\def\FEIsupervisor#1{\def\@veduciZaverecnejPrace{#1}}
\newcommand{\printVeduciZaverecnejPrace}{\@veduciZaverecnejPrace}

\def\@tempKonzultant{0}
\def\FEIconsultant#1{\def\@konzultant{#1} \def\@tempKonzultant{1}}
\newcommand{\printKonzultant}{\@konzultant}

\def\@mesto{Bratislava}
\def\FEIplace#1{\def\@mesto{#1}}
\newcommand{\printMesto}{\@mesto}

%definovanie globalnych nastaveni
\pagenumbering{arabic} 	
\pagestyle{plain}		
\parindent=0.8cm
\parskip=1pt   	
\linespread{1.3}	
\hypersetup{ colorlinks, citecolor=black, filecolor=black, linkcolor=black, urlcolor=black }
\sectionfont{\bf\fontsize{22pt}{1.3}\selectfont}	
\subsectionfont{\bf\fontsize{16pt}{1.3}\selectfont}	
\subsubsectionfont{\bf\fontsize{14pt}{1.3}\selectfont}	

\titlespacing\section{0pt}{24pt}{12pt}
\titlespacing\subsection{6pt}{12pt}{6pt}
\titlespacing\subsubsection{12pt}{10pt}{0pt}

\IfEqCase*{\FEIenglish}{
   		 {0}{
\addto\captionsslovak{\renewcommand{\figurename}{Obr\a'azok}}
\addto\captionsslovak{\renewcommand{\tablename}{Tabu\v{l}ka}}
\addto\captionsslovak{\renewcommand{\contentsname}{Obsah}}
\addto\captionsslovak{\renewcommand\listfigurename{Zoznam obr\a'azkov}}
\addto\captionsslovak{\renewcommand\listtablename{Zoznam tabuliek}}
\addto\captionsslovak{\renewcommand{\chaptername}{Kapitola}}
\addto\captionsenglish{\renewcommand{\figurename}{Obr\a'azok}}
\addto\captionsenglish{\renewcommand{\tablename}{Tabu\v{l}ka}}
\addto\captionsenglish{\renewcommand{\contentsname}{Obsah}}
\addto\captionsenglish{\renewcommand\listfigurename{Zoznam obr\a'azkov}}
\addto\captionsenglish{\renewcommand\listtablename{Zoznam tabuliek}}
\addto\captionsenglish{\renewcommand{\chaptername}{Kapitola}}
\renewcommand{\ALG@name}{Algoritmus}}
		 {1}{
\addto\captionsslovak{\renewcommand{\figurename}{Figure}}
\addto\captionsslovak{\renewcommand{\tablename}{Table}}
\addto\captionsslovak{\renewcommand{\contentsname}{Contents}}
\addto\captionsslovak{\renewcommand\listfigurename{List of Figures}}
\addto\captionsslovak{\renewcommand\listtablename{List of Table}}
\addto\captionsslovak{\renewcommand{\chaptername}{Chapter}}
\addto\captionsenglish{\renewcommand{\figurename}{Figure}}
\addto\captionsenglish{\renewcommand{\tablename}{Table}}
\addto\captionsenglish{\renewcommand{\contentsname}{Contents}}
\addto\captionsenglish{\renewcommand\listfigurename{List of Figures}}
\addto\captionsenglish{\renewcommand\listtablename{List of Table}}
\addto\captionsenglish{\renewcommand{\chaptername}{Chapter}}
\renewcommand{\ALG@name}{Algorithm}}
  		  }[]

\def\changemargin#1#2{\list{}{\rightmargin#2\leftmargin#1}\item[]}
\let\endchangemargin=\endlist 

\newcommand\FEIcover{		
	\pagestyle{empty}	
	\begin{changemargin}{0.19cm}{0.19cm} 
	\IfEqCase*{\FEIenglish}{
   		 {0}{\def\@skolaTemp{\printSkola}
			   \def\@skolaFakulta{\printFakulta}
			   \def\@skolaEvCislo{{\fontsize{12pt}{1.3}\selectfont Eviden\v{c}n\a'e \v{c}\a'islo: \printEvidencneCislo}}
			   \def\@skolaNazovPrace{\printNazov}
			   \def\@skolaTypPrace{\typPrace}}
		 {1}{\def\@skolaTemp{\printSkolaEn}
			   \def\@skolaFakulta{\printFakultaEn}
			   \def\@skolaEvCislo{{\fontsize{12pt}{1.3}\selectfont Registration number: \printEvidencneCislo}}
			   \def\@skolaNazovPrace{\printNazovEn}
			   \def\@skolaTypPrace{\typPraceEn}}
	 }[]
	\begin{center}
	{\fontsize{14pt}{1.3}\selectfont \bf \MakeTextUppercase{\@skolaTemp}\newline \MakeTextUppercase{\@skolaFakulta}}	
	\end{center}
	\vspace{10mm}
	\@skolaEvCislo
	\vspace{60mm}
	\begin{center}
	{\fontsize{16pt}{1.3}\selectfont \bf{\MakeTextUppercase{\@skolaNazovPrace}}} \\[1em] 
	{\bf\fontsize{16pt}{1.3}\selectfont \MakeTextUppercase{\@skolaTypPrace}}
	\end{center}
	\vspace{\fill}
	\begin{flushleft}
	{\fontsize{14pt}{1.3}\selectfont \bf
	\@rok
	\hfill
	\printAutor}
	\end{flushleft}	
	\end{changemargin}
	\newpage	
}

\newcommand\FEItitlePage{
	\setcounter{page}{1}
	\pagestyle{empty}
	\begin{changemargin}{0.19cm}{0.19cm} 
	\IfEqCase*{\FEIenglish}{
   		 {0}{\def\@skolaTemp{\printSkola}
			   \def\@skolaFakulta{\printFakulta}
			   \def\@skolaStudPr{\printStudijnyProgram}
			   \def\@skolaStudPrCisl{\printNazovStudijnehoOdboru}
			   \def\@skolaSkolPrac{\printSkoliacePracovisko}
			   \def\@skolaEvCislo{{\fontsize{12pt}{1.3}\selectfont Eviden\v{c}n\a'e \v{c}\a'islo: \printEvidencneCislo}}
			   \def\@skolaNazovPrace{\printNazov}
			   \def\@skolaTypPrace{\typPrace}
			   \def\@tempStudProgr{\v{S}tudijn\a'y program:}
			   \def\@tempCisloStud{\v{C}\a'islo \v{s}tudijn\a'eho odboru:}
			   \def\@tempNazovStud{N\a'azov \v{s}tudijn\a'eho odboru:}
			   \def\@tempSkolPracov{\v{S}koliace pracovisko:}
			   \def\@tempVedPrace{Ved\a'uci z\a'avere\v{c}nej pr\a'ace:}
			   \def\@tempKonzultanta{Konzultant:}}
		 {1}{\def\@skolaTemp{\printSkolaEn}
				\def\@skolaFakulta{\printFakultaEn}
				\def\@skolaStudPr{\printStudijnyProgramEn}
				\def\@skolaStudPrCisl{\printNazovStudijnehoOdboruEn}
				\def\@skolaSkolPrac{\printSkoliacePracoviskoEn}
				\def\@skolaEvCislo{\fontsize{12pt}{1.3}\selectfont Registration number: \printEvidencneCislo}		
				\def\@skolaNazovPrace{\printNazovEn}
			   \def\@skolaTypPrace{\typPraceEn}
			   \def\@tempStudProgr{Study Programme:}
			   \def\@tempCisloStud{Field Number:}
			   \def\@tempNazovStud{Study Field:}
			   \def\@tempSkolPracov{Training Workplace:}
			   \def\@tempVedPrace{Supervisor:}  
			   \def\@tempKonzultanta{Consultant:}
			 }
	 }[]
	\begin{center}
	{\fontsize{14pt}{1.3}\selectfont \bf \MakeTextUppercase{\@skolaTemp}\newline \MakeTextUppercase{\@skolaFakulta}}	
	\end{center}
	\vspace{10mm}
	{\fontsize{12pt}{1.3}\selectfont \@skolaEvCislo}	
	\vspace{60mm}
	\begin{center}
	{\fontsize{16pt}{1.3}\selectfont \bf{\MakeTextUppercase{\@skolaNazovPrace}}} \\[1em]
	{\bf\fontsize{16pt}{1.3}\selectfont  \MakeTextUppercase{\@skolaTypPrace}}
	\end{center}
	\vspace{\fill}
	\begin{tabbing}	
	\hspace*{5cm}\= \kill
	\@tempStudProgr \> \@skolaStudPr \\
	\@tempCisloStud \> \printCisloStudijnehoOdboru \\
	\@tempNazovStud \> \@skolaStudPrCisl \\
	\@tempSkolPracov \> \@skolaSkolPrac \\
	\@tempVedPrace \> \printVeduciZaverecnejPrace \\
	\IfEqCase*{\@tempKonzultant}{
   		 {0}{}
		 {1}{\@tempKonzultanta \> \printKonzultant}
  		  }[]
	\end{tabbing}
	\vspace{\fill}
	\begin{flushleft}
	{\fontsize{14pt}{1.3}\selectfont \bf
	\printMesto \
	\@rok
	\hfill
	\printAutor}
	\end{flushleft}
	\end{changemargin}
	\newpage
}

\newcommand\FEIdeclaration[1]{
	\pagestyle{empty}
	\vspace*{120mm}
	\IfEqCase*{\FEIenglish}{
   		 {0}{\section*{\fontsize{22pt}{1.3}\selectfont Vyhl\'{a}senie autora }	
Podp\'{i}san\IfEqCase*{\FEIgen}{
   		 {0}{\'{y}(\'{a})}
		 {1}{\'{y}}
		{2}{\'{a}}
}[]
\printAutor \ \v{c}estne vyhlasujem, \v{z}e som \typPraceTemp \ \printNazov \ vypracoval\IfEqCase*{\FEIgen}{
   		 {0}{(a)
		}
		 {1}{			
		}
		{2}{a		
		}
}[]
na z\'{a}klade poznatkov z\'{i}skan\'{y}ch po\v{c}as \v{s}t\'{u}dia a inform\'{a}ci\'{i} z dostupnej literat\'{u}ry uvedenej v pr\'{a}ci.
	\newline
	\indent Ved\'{u}cim mojej \typPraceTempII ~bol \IfEndWith{\@veduciZaverecnejPrace}{.}{\StrGobbleRight{\@veduciZaverecnejPrace}{1}}{\@veduciZaverecnejPrace}.
	\newline\newline
	\printMesto, d\v{n}a \printDatum
	\newline \newline \newline
	\begin{flushleft}
	{
	\hfill
	............................................\\
	\hfill
	podpis autora  \hspace*{1cm}}
	\end{flushleft}}
		 {1}{
\section*{\fontsize{22pt}{1.3}\selectfont Declaration }	
	\input{#1}
}
	 }[]
	
	\newpage
}

\newcommand\FEIthanks[1]{
	\pagestyle{empty}
	\vspace*{120mm}
	\IfEqCase*{\FEIenglish}{
   		 {0}{\section*{\fontsize{22pt}{1.3}\selectfont Po\v{d}akovanie}}
		 {1}{\section*{\fontsize{22pt}{1.3}\selectfont Acknowledgments}}
		  }[]
	
	\ifthenelse{\isempty{#1}}%
    {Chcem sa po\v{d}akova\v{t} ved\'{u}cemu z\'{a}vere\v{c}nej pr\'{a}ce, ktor\'{y}m bol \printVeduciZaverecnejPrace, za odborn\'{e} vedenie, rady a pripomienky, ktor\'{e} mi pomohli pri vypracovan\'{i} tejto  \typPraceTempII.}
    {\input{#1}}	
	\newpage
}

\newcommand\FEIassignment[1]{	
	\pagestyle{empty}
	\setlength{\voffset}{-2.5cm}
	\begin{center}
	  \makebox[\textwidth]{\includegraphics[width=\paperwidth]{#1}}
	\end{center}
	\setlength{\hoffset}{0cm} 
	\setlength{\voffset}{0cm}
}

\newcommand\FEIabstract[2]{	
	\pagestyle{empty}	
	\section*{\fontsize{22pt}{1.3}\selectfont S\'{U}HRN}
	\noindent\MakeTextUppercase{\printSkola}
	\newline
	\MakeTextUppercase{\printFakulta} \\
	\begin{tabbing}	
	\hspace*{7cm}\= \kill
	\v{S}tudijn\a'y program:\> \printStudijnyProgram \\
	Autor:\> \printAutor \\
	\typPrace:\>
	\begin{minipage}[t]{20em}
		\printNazov
	\end{minipage} \\
	Ved\a'uci z\a'avere\v{c}nej pr\a'ace:\> \printVeduciZaverecnejPrace \\\IfEqCase*{\@tempKonzultant}{
   		 {0}{}
		 {1}{Konzultant:\>\printKonzultant \\}
  		  }[]Miesto a rok predlo\v{z}enia pr\a'ace:\>\printMesto \ \@rok \\
	\end{tabbing}
	\input{#1} 
	\\ \\
	K\v{l}\a'u\v{c}ov\a'e slov\a'a: #2 
	\newpage
}

\newcommand\FEIabstractEn[2]{	
	\pagestyle{empty}	
	\section*{\fontsize{22pt}{1.3}\selectfont ABSTRACT\color{white}\'U\color{black}}
	\noindent\MakeTextUppercase{\printSkolaEn}
	\newline
	\MakeTextUppercase{\printFakultaEn} \\
	\begin{tabbing}	
	\hspace*{7cm}\= \kill
	Study Programme:\> \printStudijnyProgramEn \\
	Author:\> \printAutor \\
	\typPraceEn:\>
	\begin{minipage}[t]{20em}
		\printNazovEn
	\end{minipage} \\
	Supervisor:\> \printVeduciZaverecnejPrace \\\IfEqCase*{\@tempKonzultant}{
   		 {0}{}
		 {1}{Consultant:\>\printKonzultant \\}
  		  }[]Place and year of submission:\>\printMesto \ \@rok \\
	\end{tabbing}
	\input{#1}
	\\ \\
	Keywords: #2 
	\newpage
}

\newcommand\FEIcontent{	
	\pagestyle{empty}
	 \addtocontents{toc}{\protect\thispagestyle{empty}}
	\tableofcontents
	\newpage
}

\newcommand\listoffiguresandtables{	
	\IfEqCase*{\FEIenglish}{
   		 {0}{\renewcommand{\cftfigpresnum}{Obr\'{a}zok\ }
	\renewcommand{\cfttabpresnum}{Tabu\v{l}ka\ }}
		 {1}{\renewcommand{\cftfigpresnum}{Figure\ }
	\renewcommand{\cfttabpresnum}{Table\ }}
		  }[]	
	\newlength{\mylenf}
	\settowidth{\mylenf}{\cftfigpresnum}
	\setlength{\cftfignumwidth}{\dimexpr\mylenf+2em}
	\setlength{\cfttabnumwidth}{\dimexpr\mylenf+2em}
	\IfEqCase*{\FEIenglish}{
   		 {0}{\subsection*{Zoznam obr\'{a}zkov a tabuliek}}
		 {1}{ \subsection*{List of Figures and Tables}}
		  }[]	   
	\vspace{5mm}
   \phantomsection
	\@starttoc{lof}
	\bigskip
	\@starttoc{lot}
}

\newcommand\FEIlistOfTables{		
	\pagestyle{empty}
	\listoftables
	\newpage
	\pagestyle{empty}	
}

\newcommand\FEIlistOfFigures{	
	\pagestyle{empty}
	\listoffigures
	\newpage
	\pagestyle{empty}
}

\newcommand\FEIlistOfAlgorithms{	
	\makeatletter	
	\IfEqCase*{\FEIenglish}{
   		 {0}{\def\@zoznamAlg{Zoznam algoritmov}}
		 {1}{\def\@zoznamAlg{List of Algorithm}}
		  }[]
	\renewcommand{\listalgorithmname}{\bf\fontsize{16pt}{1.3}\selectfont \@zoznamAlg}
	\makeatother
	\pagestyle{empty}
	\listofalgorithms
	\newpage
	\pagestyle{empty}
}

\newcommand\FEIlistOfFiguresAndTables{	
	\pagestyle{empty}
	\listoffiguresandtables
	\newpage
	\pagestyle{empty}
}

\newcommand\FEIlistOfAbbreviations[1]{	
	\pagestyle{empty}
	\IfEqCase*{\FEIenglish}{
   		 {0}{\def\@zoznamZn{Zoznam skratiek}}
		 {1}{\def\@zoznamZn{List of Abbreviations}}
		  }[]
	\addtocontents{lof}{\protect\thispagestyle{empty}}
	\addtocontents{lot}{\protect\thispagestyle{empty}}
	\subsection*{\@zoznamZn}													
	\vspace{5mm} \noindent
	\input{#1}
	\newpage	
}

\newcommand\FEIlistOfSymbols[1]{	
	\pagestyle{empty}
	\IfEqCase*{\FEIenglish}{
   		 {0}{\def\@zoznamZnb{Zoznam zna\v{c}iek}}
		 {1}{\def\@zoznamZnb{List of Symbols}}
		  }[]
	\addtocontents{lof}{\protect\thispagestyle{empty}}
	\addtocontents{lot}{\protect\thispagestyle{empty}}
	\subsection*{\@zoznamZnb}													
	\vspace{5mm} \noindent
	\input{#1}
	\newpage	
}

\newcommand\FEIlistOfAbbreviationsAndSymbols[1]{	
	\pagestyle{empty}
	\IfEqCase*{\FEIenglish}{
   		 {0}{\def\@zoznamZnc{Zoznam skratiek a zna\v{c}iek}}
		 {1}{\def\@zoznamZnc{List of Abbreviations and Symbols}}
		  }[]
	\addtocontents{lof}{\protect\thispagestyle{empty}}
	\addtocontents{lot}{\protect\thispagestyle{empty}}
	\subsection*{\@zoznamZnc}
	\vspace{5mm} \noindent
	\input{#1}
	\newpage
}

\newcommand\FEIintroduction[1]{	
	%\setcounter{page}{1}
	\pagestyle{plain}
	\IfEqCase*{\FEIenglish}{
   		 {0}{\def\@zoznamUv{\'{U}vod}}
		 {1}{\def\@zoznamUv{Introduction}}
		  }[]
	\cleardoublepage
	\phantomsection
	\addcontentsline{toc}{section}{\@zoznamUv}
	\section*{\@zoznamUv}
	 \noindent \input{#1}
}

\newcommand\FEIcore[1]{
	\let\stdsection\section
	\renewcommand\section{\newpage\stdsection}	
	\newpage
	\input{#1}
}

\newcommand\FEIconclusion[1]{	
	\newpage
\IfEqCase*{\FEIenglish}{
   		 {0}{\def\@zoznamZa{Z\'{a}ver}}
		 {1}{\def\@zoznamZa{Conclusion}}
		  }[]
	\cleardoublepage
	\phantomsection	
	\addcontentsline{toc}{section}{\@zoznamZa}
	\section*{ \@zoznamZa}
	 \noindent \noindent \input{#1}
}

\newcommand\FEIresume[1]{	
	\newpage
	\cleardoublepage
	\phantomsection	
	\addcontentsline{toc}{section}{Resum\'{e}}
	\section*{Resum\'{e}}
	 \noindent \noindent \input{#1}
}

\newcommand\FEIbibliography[2]{	
	\newpage
	\cleardoublepage
	\phantomsection	
	\IfEqCase*{\FEIenglish}{
   		 {0}{\def\@zoznamBib{Zoznam pou\v{z}itej literat\'{u}ry}}
		 {1}{\def\@zoznamBib{Bibliography}}
		  }[]
	\addcontentsline{toc}{section}{\@zoznamBib}
	\renewcommand\refname{\@zoznamBib}	
	\bibliographystyle{#2} 
	\bibliography{#1}
}

\newcounter{listOfAppendix}


\IfEqCase*{\FEIenglish}{
   		 {0}{\def\@zoznamPri{Pr\'{i}lohy}}
		 {1}{\def\@zoznamPri{Appendix}}
		  }[]

\newcommand\FEIlistOfAppendix{	
	\newpage
	\renewcommand \thesection{\Alph{section}}
	\setcounter{section}{0}
	\setcounter{subsection}{0}
	\setcounter{subsubsection}{0}
	\renewcommand \thetable{\Alph{section}}
	\setcounter{table}{0}
	\counterwithin{table}{section}
	\setcounter{figure}{0}
	\counterwithin{figure}{section}
	\setcounter{algorithm}{0}
	\counterwithin{algorithm}{section}
	\setcounter{page}{1}  
	\pagenumbering{Roman}
	\cleardoublepage
	\phantomsection	
	\addcontentsline{toc}{section}{\@zoznamPri}
	\listofpriloh
}

\newcommand\FEIappendix[2]{	
	\newpage
	\cleardoublepage	
	\phantomsection	
	\section{ #1}	
	\noindent
	\pridajPrilohu{#1}	
	\input{#2}
}

\newlistof{priloh}{pri}{\@zoznamPri}
\newcommand{\pridajPrilohu}[1]{
\refstepcounter{priloh}
\addcontentsline{pri}{priloh}{\protect\numberline{\Alph{section}} #1}\par
}

\newcommand\FEIpdfInfo{	
	\hypersetup{pdfinfo={
Title={\printNazovEn},
Author={\printAutor},
Subject={\typPraceEn},
Keywords ={\typPraceEn, \printSkolaEn, \printFakulta}
}}
}
\endinput
