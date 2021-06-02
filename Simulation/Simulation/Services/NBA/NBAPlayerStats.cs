using Simulation.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Simulation.Services.NBA
{
    public class NBAPlayerStats
    {
        public string Name { get; set; }
        public float Points { get; set; }
        public float Tc { get; set; }
        public float ThreePoints { get; set; }
        public float Reb { get; set; }
        public float Ast { get; set; }
        public float Stl { get; set; }
        public float Blq { get; set; }

        private static List<float> GenerateABC(int type)
        {
            float min = 0;
            float mode = 0;
            float max = 0;

            if (type == 0)
            {
                min = 1;
                mode = 15;
                max = 40;
            }
            else if (type == 1)
            {
                min = 16;
                mode = 46;
                max = 66;
            }
            else if (type == 2)
            {
                min = 16;
                mode = 36;
                max = 56;
            }
            else if (type == 3)
            {
                min = 2;
                mode = 8;
                max = 20;
            }
            else if (type == 4)
            {
                min = 1;
                mode = 5;
                max = 15;
            }
            else if (type == 5)
            {
                min = 0;
                mode = 2;
                max = 4;
            }
            else if (type == 6)
            {
                min = 0;
                mode = 2;
                max = 4;
            }

            List<float> abc = new List<float> { min, mode, max };

            return abc;
        }

        public static List<NBAPlayerStats> GenerateStats(List<NBAPlayerDTO> players)
        {
            List<NBAPlayerStats> playerStatsList = new List<NBAPlayerStats>();

            foreach (var player in players)
            {
                List<float> stats = new List<float>();

                // Triangle distribution
                for (int j=0; j<7; j++)
                {
                    var abc = GenerateABC(j);
                    float trinagle = (abc[1] - abc[0]) / (abc[2] - abc[0]);

                    if (trinagle <= player.Ri[j])
                    {
                        float x = abc[2] - ((float)Math.Sqrt((double)((abc[2] - abc[1])*(abc[2] - abc[0])*(1- player.Ri[j]))));
                        stats.Add(x);
                    }
                    else
                    {
                        float x = abc[0] + ((float)Math.Sqrt((double)((abc[1] - abc[0]) * (abc[2] - abc[0]) * player.Ri[j])));
                        stats.Add(x);
                    }
                }

                NBAPlayerStats playerStats = new NBAPlayerStats()
                {
                    Name = player.Name,
                    Points = stats[0],
                    Tc = stats[1],
                    ThreePoints = stats[2],
                    Reb = stats[3],
                    Ast = stats[4],
                    Stl = stats[5],
                    Blq = stats[6],
                };

                playerStatsList.Add(playerStats);
            }

            return playerStatsList;
        }

        public static string SelectPlayer(List<NBAPlayerStats> playersStats)
        {
            float maxStatsSum = playersStats.Max(player => player.Points + player.Tc + player.ThreePoints + player.Reb + player.Ast + player.Stl + player.Blq );
            List<NBAPlayerStats> playerL = playersStats.Where(player => player.Points + player.Tc + player.ThreePoints + player.Reb + player.Ast + player.Stl + player.Blq == maxStatsSum).ToList();

            return playerL[0].Name;
        }
    }
}
