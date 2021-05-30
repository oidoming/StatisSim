using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Simulation.Services.RandomNums
{
    public class PseudoRandomNums: IPseudoRandomNums
    {
        public int N { get; set; }
        public float X0 { get; set; }
        public float a { get; set; }
        public float c { get; set; }
        public float M { get; set; }

        //public List<float> RandomNumbers { get; set; }
        /*
        public PseudoRandomNums(float X0, float a, float c, float M)
        {
            this.X0 = X0;
            this.a = a;
            this.c = c;
            this.M = M;
            //X0 = 17;
            //a = 101;
            //c = 221;
            //M = 17001;
        }
        */
        public List<float> GenerateNumbers()
        {
            List<float> randomNums = new List<float>();

            // Xi+1 = (a * X0 + c) % M

            float subTotal = a * X0 + c;
            float mod = subTotal % M;
            float result = mod / (M - 1);
            randomNums.Add(result);

            for (int i=1; i<N; i++)
            {
                X0 = mod;
                subTotal = a * X0 + c;
                mod = subTotal % M;
                result = mod / (M - 1);
                randomNums.Add(result);
            }

            return randomNums;
        }
    }
}
