﻿using DAL.Interfaces;
using Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Implementation
{
    public class UnidadDeTrabajo : IUnidadDeTrabajo
    {

        QuizContext context;
        public IDepartmentDAL DepartmentDAL { get; set; }
        public IPersonDAL PersonDAL { get; set; }

        public UnidadDeTrabajo(QuizContext context, IDepartmentDAL departmentDAL, IPersonDAL personDAL)
        {
            this.context = context;
            DepartmentDAL = departmentDAL;
            PersonDAL = personDAL;
        }
        public void Dispose()
        {
            this.context.Dispose();
        }

        public void Complete()
        {
            context.SaveChanges();
        }
    }
}

