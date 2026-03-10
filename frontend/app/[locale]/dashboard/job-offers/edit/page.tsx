import { Suspense } from 'react';
import EditJobOfferClient from './EditJobOfferClient';

export default function EditJobOfferPage() {
    return (
        <Suspense fallback={<div className="p-6">Chargement...</div>}>
            <EditJobOfferClient />
        </Suspense>
    );
}
