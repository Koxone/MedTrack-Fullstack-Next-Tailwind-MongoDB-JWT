import { ArrowDownCircle, ArrowUpCircle, User } from 'lucide-react';
import React from 'react';

function CategoryBlock({ transaction }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="font-semibold">Corrección de Categoría</span>
      </div>

      <div className="space-y-1 text-sm text-gray-700">
        <p>
          <span className="font-medium text-gray-800">Motivo:</span> {transaction?.reason}
        </p>
        <p>
          <span className="font-medium text-gray-800">Tipo:</span> Corrección de Categoría
        </p>
        <p>
          <span className="font-medium text-gray-800">Categoría Anterior:</span>{' '}
          {transaction?.oldCategory}
        </p>

        <p>
          <span className="font-medium text-gray-800">Categoría Nueva:</span>{' '}
          {transaction?.newCategory}
        </p>
      </div>

      <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
        <User className="h-4 w-4 text-gray-500" />
        <span>{transaction?.performedBy?.fullName}</span>
      </div>

      <p className="mt-1 text-xs text-gray-400">
        {new Date(transaction?.createdAt).toLocaleString()}
      </p>
    </div>
  );
}

export default CategoryBlock;
