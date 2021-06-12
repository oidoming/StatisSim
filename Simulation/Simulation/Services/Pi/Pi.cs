using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Simulation.Services.Pi
{
    public class Pi
    {
        public int N { get; set; }
        public float RandomNum1 { get; set; }
        public float RandomNum2 { get; set; }
        public float R1R2 { get; set; }
        public int X { get; set; }

        public static (List<Pi>, float) GetPi(List<float> randomNums)
        {
            int x = 0;
            float r1r2;
            List<Pi> piInfo = new List<Pi>();
            int r1 = 0;
            int r2 = 1;

            int size = (randomNums.Count % 2 != 0) ? (randomNums.Count / 2) - 1 : randomNums.Count / 2;

            for (int i = 0; i < size; i++)
            {
                r1r2 = (float)Math.Sqrt(Math.Pow(randomNums[r1], 2) + Math.Pow(randomNums[r2], 2));

                if (r1r2 <= 1)
                {
                    x += 1;
                }

                Pi pi = new Pi()
                {
                    N = i+1,
                    RandomNum1 = randomNums[r1],
                    RandomNum2 = randomNums[r2],
                    R1R2 = r1r2,
                    X = x
                };

                piInfo.Add(pi);

                r1 = r2 + 1;
                r2 = r2 + 2;
            }

            float piValue = 4 * ((float)piInfo[piInfo.Count - 1].X / (float)piInfo[piInfo.Count - 1].N);

            return (piInfo, piValue);
        }
    }
}
