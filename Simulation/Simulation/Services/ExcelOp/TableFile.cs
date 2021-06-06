using SpreadsheetLight;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Simulation.Services.ExcelOp
{
    public class TableFile
    {
        public static float ReadFile(double toFind)
        {
            string path = Path.GetFullPath(Path.Combine(AppContext.BaseDirectory, "..\\..\\..\\..\\")) + "Book (1).xlsx";

            SLDocument sl = new SLDocument(path);
            sl.SelectWorksheet("Sheet2");
            double val;
            //val = sl.GetCellValueAsDouble(3, 2);
            //double toFind = 0.975;
            double sumVal = 0.0;
            int iRow = 2;
            int iCol = 2;
            int b = 0;
            while (b == 0)
            {
                //val = sl.GetCellValueAsDouble(iRow, iCol);
                for (int i = iCol; i <= 11; i++)
                {
                    val = sl.GetCellValueAsDouble(iRow, i);
                    if (toFind <= val)
                    {
                        Console.WriteLine(val);
                        if (toFind == val)
                        {
                            double col = sl.GetCellValueAsDouble(1, i);
                            double row = sl.GetCellValueAsDouble(iRow, 1);
                            sumVal = col + row;
                            b = 1;
                            break;
                        }
                        else
                        {
                            double inf;
                            double inf2;
                            double x;
                            double z;
                            if (i == 2)
                            {
                                inf = sl.GetCellValueAsDouble(iRow - 1, 11);
                                x = val - inf;
                                z = 0.09;
                                inf2 = toFind - inf;
                                sumVal = ((inf2 * x) / z) + (sl.GetCellValueAsDouble(iRow - 1, 1) + sl.GetCellValueAsDouble(1, 11));
                                b = 1;
                                break;
                            }
                            else
                            {
                                inf = sl.GetCellValueAsDouble(iRow, i - 1);
                                x = val - inf;
                                z = sl.GetCellValueAsDouble(1, i) - sl.GetCellValueAsDouble(1, i - 1);
                                inf2 = toFind - inf;
                                sumVal = ((inf2 * x) / z) + (sl.GetCellValueAsDouble(iRow, 1) + sl.GetCellValueAsDouble(1, i - 1));
                                b = 1;
                                break;
                            }
                        }
                    }
                }
                iRow++;
            }

            //sl.CloseWithoutSaving();
            Console.WriteLine(sumVal);

            return (float)sumVal;
        }
    }
}
