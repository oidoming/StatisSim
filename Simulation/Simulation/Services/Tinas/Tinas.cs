using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Simulation.Services.Tinas
{
    public class Tinas
    {
        public int N { get; set; }
        public int Tina { get; set; }
        public float RandomNum { get; set; }
        public float Weight { get; set; }
        public float AccumulatedWeight { get; set; }
        public bool ExceedCapacity { get; set; }

        public static (List<Tinas>, string, float) GenerateTinas(List<float> randomNums)
        {
            //int range = randomNums.Count / 5;
            int range = randomNums.Count;
            /*
            if (randomNums.Count % 5 != 0)
            {
                range = randomNums.Count - (randomNums.Count % 5);
            }
            else
            {
                range = randomNums.Count;
            }
            */
            int n = 1;
            int tinaNum = 1;
            float accumulatedW = 0;
            int cost = 0;
            int year = 1;
            int nSplit = 130;
            List<Tinas> tinasList = new List<Tinas>();
            List<int> costYear = new List<int>();

            for (int j = 0; j < range / 130; j++)
            {
                for (int i = nSplit-130; i < nSplit; i++)
                {
                    float weight = (randomNums[i] <= 0.5) ? 190 + (float)Math.Sqrt(800 * randomNums[i]) : 230 - (float)Math.Sqrt(800 * (1 - randomNums[i]));
                    accumulatedW += weight;

                    if (accumulatedW >= 1000)
                    {
                        cost += 200;
                    }

                    Tinas tina = new()
                    {
                        N = n,
                        Tina = tinaNum,
                        RandomNum = randomNums[i],
                        Weight = weight,
                        AccumulatedWeight = accumulatedW,
                        ExceedCapacity = (accumulatedW >= 1000) ? true : false
                    };

                    if (tinaNum % 5 == 0)
                    {
                        accumulatedW = 0;
                        tinaNum = 0;
                        n++;
                    }

                    tinaNum++;

                    tinasList.Add(tina);
                }

                costYear.Add(cost);
                cost = 0;
                nSplit += 130;
                year++;
            }
            float average;
            try
            {
                average = costYear.Sum() / costYear.Count;
            }
            catch (DivideByZeroException Ex)
            {
                average = 0;
            }
            //float average = (cost != 0) ? costYear.Sum() / costYear.Count : 0;
            string decision = (average <= 5180.76) ? "Seguir utilizando los servicios de transporte" : "Contratar nuevos servicios de transporte"; // true continuar camion actual, false contratar nuevo

            return (tinasList, decision, average);
        }
    }
}
