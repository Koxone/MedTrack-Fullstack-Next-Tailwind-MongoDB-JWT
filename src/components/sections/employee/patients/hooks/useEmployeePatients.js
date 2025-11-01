import { employeePatientsService } from '../services/employeePatientsService';

export function useEmployeePatients() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    employeePatientsService
      .getAllPatients()
      .then(setPatients)
      .finally(() => setLoading(false));
  }, []);

  return { patients, loading };
}
