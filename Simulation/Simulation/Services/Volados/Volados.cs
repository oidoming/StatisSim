using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Simulation.Services.Volados
{
    public class Volados
    {
        // Generate volados information for the volados table and return list of volados info and the probability of win
        public static (List<VoladosInfo>, float) GenerateVolados(List<float> randomNums, int available, int bet, int goal)
        {
            List<VoladosInfo> voladosInfos = new List<VoladosInfo>();
            int run = 1;
            int tempAvailable = available;
            int tempBet = bet;
            int numOfWins = 0;
            int numOfLooses = 0;
            int c = 0;
            foreach (float num in randomNums)
            {
                c++;
                bool won = (num < 0.5) ? true : false;
                int afterVolado = (won == true) ? tempAvailable + tempBet : tempAvailable - tempBet;
                bool reachedGoal = (afterVolado == goal) ? true : false;

                VoladosInfo voladosInfo = new()
                {
                    Run = run,
                    BeforeVolado = tempAvailable,
                    Bet = tempBet,
                    RandomNum = num,
                    Win = won,
                    AfterVolado = (afterVolado <= 0) ? 0 : afterVolado,
                    Goal = reachedGoal
                };

                voladosInfos.Add(voladosInfo);

                if (afterVolado == goal || (c == randomNums.Count && afterVolado == goal))
                {
                    numOfWins += 1;
                }
                else if (afterVolado <= 0 || (c == randomNums.Count && afterVolado < goal))
                {
                    numOfLooses += 1;
                }

                tempBet = (won == false) ? tempBet * 2 : bet;

                if (reachedGoal == true || afterVolado <= 0)
                {
                    run += 1;
                    tempAvailable = available;
                    tempBet = bet;
                    continue;
                }

                tempAvailable = afterVolado;
            }

            int totalRuns = numOfWins + numOfLooses;
            float probOfWin = numOfWins / (float)totalRuns;

            return (voladosInfos, probOfWin);
        }
    }
}
