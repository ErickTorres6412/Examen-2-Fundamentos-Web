using DAL.Interfaces;
using Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace DAL.Implementation
{
    public class DepartmentDALImpl : GenericDALImpl<Department>, IDepartmentDAL
    {
        QuizContext context;

        public DepartmentDALImpl(QuizContext context) : base(context)
        {
            this.context = context;
        }

    }
}
