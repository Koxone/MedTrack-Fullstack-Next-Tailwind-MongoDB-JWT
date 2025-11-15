import { ArrowDownCircle, ArrowUpCircle, User } from 'lucide-react';
import React from 'react';

function QuantityBlock({ transaction }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="font-semibold">Corrección de Existencias</span>

        <span
          className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${
            transaction?.movement === 'IN'
              ? 'bg-green-200 text-green-700'
              : 'bg-red-200 text-red-500'
          }`}
        >
          {transaction?.movement === 'IN' ? (
            <ArrowUpCircle className="h-4 w-4" />
          ) : (
            <ArrowDownCircle className="h-4 w-4" />
          )}
          {transaction?.quantity} unidades
        </span>
      </div>

      <div className="space-y-1 text-sm text-gray-700">
        <p>
          <span className="font-medium text-gray-800">Motivo:</span> {transaction?.reason}
        </p>
        <p>
          <span className="font-medium text-gray-800">Tipo:</span> Corrección de Inventario
        </p>
        <p>
          <span className="font-medium text-gray-800">Cantidad Anterior:</span>{' '}
          {transaction?.oldQuantity} unidades
        </p>
        <p>
          <span className="font-medium text-gray-800">Cambio:</span>{' '}
          {transaction?.movement === 'IN' ? '+' : '-'}
          {transaction?.quantityDelta} unidades
        </p>
        <p>
          <span className="font-medium text-gray-800">Cantidad Nueva:</span>{' '}
          {transaction?.newQuantity} unidades
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

export default QuantityBlock;
